import { loginSchema, transferSchema } from "../../src/utils/schemas";

describe("loginSchema", () => {
  it("validates correct login data", () => {
    const result = loginSchema.safeParse({
      cpf: "12345678900",
      password: "123456",
    });
    expect(result.success).toBe(true);
  });

  it("fails on short password", () => {
    const result = loginSchema.safeParse({
      cpf: "12345678900",
      password: "123",
    });
    expect(result.success).toBe(false);
  });

  it("fails on short CPF", () => {
    const result = loginSchema.safeParse({
      cpf: "1234567890",
      password: "123456",
    });
    expect(result.success).toBe(false);
  });

  it("transforms CPF to just numbers", () => {
    const result = loginSchema.parse({
      cpf: "123.456.789-00",
      password: "123456",
    });
    expect(result.cpf).toBe("12345678900");
  });
});

describe("transferSchema", () => {
  const validData = {
    bank: "Nubank",
    account: "12345-6",
    cpf: "12345678900",
    beneficiaryName: "João Silva",
    amount: 100,
    note: "pagamento",
  };

  it("validates correct transfer data", () => {
    const result = transferSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("fails without bank", () => {
    const result = transferSchema.safeParse({ ...validData, bank: "" });
    expect(result.success).toBe(false);
  });

  it("fails with invalid account format", () => {
    const result = transferSchema.safeParse({
      ...validData,
      account: "1234-5",
    });
    expect(result.success).toBe(false);
  });

  it("fails with negative amount", () => {
    const result = transferSchema.safeParse({ ...validData, amount: -1 });
    expect(result.success).toBe(false);
  });

  it("fails with zero amount", () => {
    const result = transferSchema.safeParse({ ...validData, amount: 0 });
    expect(result.success).toBe(false);
  });

  it("fails with short beneficiary name", () => {
    const result = transferSchema.safeParse({
      ...validData,
      beneficiaryName: "J",
    });
    expect(result.success).toBe(false);
  });

  it("fails with note over 140 chars", () => {
    const result = transferSchema.safeParse({
      ...validData,
      note: "a".repeat(141),
    });
    expect(result.success).toBe(false);
  });

  it("accepts optional note", () => {
    const { note: _, ...dataWithoutNote } = validData;
    const result = transferSchema.safeParse(dataWithoutNote);
    expect(result.success).toBe(true);
  });

  it("transforms CPF to just numbers", () => {
    const result = transferSchema.parse({
      ...validData,
      cpf: "123.456.789-00",
    });
    expect(result.cpf).toBe("12345678900");
  });
});
