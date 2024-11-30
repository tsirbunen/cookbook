import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure
} from '@chakra-ui/react'
import ButtonWithTheme from '../../theme/buttons/ButtonWithTheme'
import { ButtonVariant } from '../../theme/buttons/buttons-theme'

export const useModalWithActions = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return { isOpen, onOpen, onClose }
}

type ModalWithActionsProps = {
  isOpen: boolean
  onClose: () => void
  header: string
  cancelLabel: string
  confirmLabel: string
  modalBody: React.ReactNode
}

const ModalWithActions = ({ isOpen, onClose, header, confirmLabel, cancelLabel, modalBody }: ModalWithActionsProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{header}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{modalBody}</ModalBody>

        <ModalFooter>
          <ButtonWithTheme variant={ButtonVariant.MediumSizeDark} label={cancelLabel} onClick={onClose} />
          <ButtonWithTheme variant={ButtonVariant.MediumSizeDark} label={confirmLabel} />
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalWithActions
