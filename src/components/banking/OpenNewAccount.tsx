import NewAccountForm from "./NewAccountForm";

interface OpenNewAccountProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
  customerId?: number;
}

export default function OpenNewAccount({
  open,
  onOpenChange,
  onSuccess,
  customerId,
}: OpenNewAccountProps) {
  return (
    <NewAccountForm
      open={open}
      onOpenChange={onOpenChange}
      onSuccess={onSuccess}
      customerId={customerId}
    />
  );
}
