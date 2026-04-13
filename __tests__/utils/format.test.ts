import {
  formatCurrency,
  formatDate,
  formatDateShort,
  formatCPF,
  formatAccountNumber,
  formatMoneyInput,
  parseMoneyInput,
  getInitials,
} from "@/utils/format";

describe("formatCurrency", () => {
  it("formats number to BRL string", () => {
    const result = formatCurrency(1234.56);
    expect(result).toMatch(/R\$/);
    expect(result).toMatch(/1\.234/);
    expect(result).toMatch(/56/);
  });

  it("formats zero correctly", () => {
    const result = formatCurrency(0);
    expect(result).toMatch(/R\$/);
    expect(result).toMatch(/0,00/);
  });

  it("formats large numbers correctly", () => {
    const result = formatCurrency(1000000);
    expect(result).toMatch(/R\$/);
    expect(result).toMatch(/1\.000\.000/);
  });
});

describe("formatDate", () => {
  it("formats date to long date string in pt-BR", () => {
    const result = formatDate("2024-04-15T12:00:00");
    expect(result).toMatch(/15/);
    expect(result).toMatch(/abril/);
  });
});

describe("formatDateShort", () => {
  it("formats date to dd/mm in pt-BR", () => {
    const result = formatDateShort("2024-04-15T12:00:00");
    expect(result).toMatch(/15/);
    expect(result).toMatch(/04/);
  });
});

describe("formatCPF", () => {
  it("formats 11 digit CPF correctly", () => {
    expect(formatCPF("12345678900")).toBe("123.456.789-00");
  });

  it("truncates to 14 chars when input exceeds 11 digits", () => {
    expect(formatCPF("123.456.789-001")).toBe("123.456.789-00");
  });

  it("formats partial CPF", () => {
    expect(formatCPF("1234567")).toBe("123.456.7");
  });

  it("formats 4-6 digit CPF with one dot group", () => {
    expect(formatCPF("1234")).toBe("123.4");
  });

  it("returns digits as-is for 3 or fewer characters", () => {
    expect(formatCPF("123")).toBe("123");
  });
});

describe("formatAccountNumber", () => {
  it("formats numeric string to account format", () => {
    expect(formatAccountNumber("123456")).toBe("12345-6");
  });

  it("returns original value when shorter than 6 digits", () => {
    expect(formatAccountNumber("123")).toBe("123");
  });
});

describe("formatMoneyInput", () => {
  it("formats input to money string", () => {
    expect(formatMoneyInput("1234")).toBe("12,34");
  });

  it("handles empty string", () => {
    expect(formatMoneyInput("")).toBe("");
  });
});

describe("parseMoneyInput", () => {
  it("parses money string to number", () => {
    expect(parseMoneyInput("12,34")).toBe(12.34);
  });

  it("handles empty string", () => {
    expect(parseMoneyInput("")).toBe(0);
  });
});

describe("getInitials", () => {
  it("gets initials from full name", () => {
    expect(getInitials("Maria Silva")).toBe("MS");
  });

  it("gets two letters from single name", () => {
    expect(getInitials("Maria")).toBe("MA");
  });
});
