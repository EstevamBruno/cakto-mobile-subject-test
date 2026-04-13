export interface BottomSheetOption {
  id: string;
  label: string;
  sublabel?: string;
}

export interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  options: BottomSheetOption[];
  onSelect: (option: BottomSheetOption) => void;
  selectedId?: string;
}
