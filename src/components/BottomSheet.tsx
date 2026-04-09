import React from "react"
import { View, Text, Modal } from "react-native"

interface BottomSheetOption {
  id: string
  label: string
  sublabel?: string
}

interface BottomSheetProps {
  visible: boolean
  onClose: () => void
  title: string
  options: BottomSheetOption[]
  onSelect: (option: BottomSheetOption) => void
  selectedId?: string
}

/**
 * TODO: Implementar componente BottomSheet
 *
 * Requisitos:
 * - Modal transparente com animationType="slide"
 * - Backdrop escuro (colors.overlay) que fecha ao tocar
 * - Handle visual no topo (barra cinza de 40x4)
 * - Header com título + botão X para fechar
 * - FlatList com as opções
 * - Item selecionado com destaque visual (fundo azul claro)
 * - Ao selecionar, chamar onSelect + onClose
 * - Acessibilidade no botão de fechar
 * - Max height: 60%
 *
 * Referência: SPEC.md seção 5 — Componentes Reutilizáveis
 */
export function BottomSheet({
  visible,
  onClose,
  title,
  options,
  onSelect,
  selectedId,
}: BottomSheetProps) {
  return (
    <Modal visible={visible} transparent onRequestClose={onClose}>
      <View>
        <Text>{title}</Text>
      </View>
    </Modal>
  )
}
