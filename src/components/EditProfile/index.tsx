import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input as NextInput
} from "@nextui-org/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import Input from "../ui/Input"
import Textarea from "../ui/TextArea"

import { TDataUpdateUser } from "../../app/types"
import useUpdateUser from "../../hooks/useUpdateUser"
import ErrorMessage from "../ui/ErrorMessage"
import { formatDateForInput } from "../../utils/formatDateForInput"

type EditProfileProps = {
  isOpen: boolean
  onOpen: () => void
  onOpenChange: () => void,
  onClose: () => void
  userId :string
}

const EditProfile: React.FC<EditProfileProps> = ({
  isOpen,
  onOpenChange,
  userId,
  onClose
}) => {
  const currentUser = useSelector(selectCurrent)
  const {fetchUpdateUser, error, isLoading} = useUpdateUser()
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  if (!currentUser) {
    return null
  }

  const defaultValues: TDataUpdateUser = {
    name: currentUser.name || "",
    bio: currentUser.bio || "",
    dateOfBirth: formatDateForInput(currentUser.dateOfBirth) || "",
    location: currentUser.location || "",
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues,
  })
  
  const fileHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null) {
      setAvatarFile(e.target.files[0])
    }
  } 

  const onSubmit = (data: TDataUpdateUser) => {
    fetchUpdateUser({...data, avatar: avatarFile}, userId, onClose)
  }


  return (
    <Modal isOpen={isOpen} placement={"center"} onOpenChange={onOpenChange}>
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Edit Profile
            </ModalHeader>

            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalBody>
                <Input
                  control={control}
                  label="Name"
                  placeholder="Change your name)"
                  name="name"
                />
                <Input
                  control={control}
                  label="Date of birth"
                  placeholder="Change your date)"
                  name="dateOfBirth"
                  type="date"
                />
                <Input
                  control={control}
                  label="Location"
                  placeholder="Change your location)"
                  name="location"
                />
                <Textarea
                  label="Bio:"
                  control={control}
                  name="bio"
                  placeholder="Change your bio)"
                  requiredMessage="This field can't be empty"
                />

                <NextInput
                  label="Avatar:"
                  type="file"
                  onChange={fileHandler}
                  name="avatar"
                  placeholder="Change your avatar)"
                />

                <ModalFooter>
                  <ErrorMessage error={error} />
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" type="submit" isLoading={isLoading}>
                    Update
                  </Button>
                </ModalFooter>
              </ModalBody>
            </form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default EditProfile
