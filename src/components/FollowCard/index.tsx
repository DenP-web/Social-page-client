import { Avatar, Button, Card, CardHeader } from "@nextui-org/react"
import React from "react"
import { User } from "../../app/types"
import { BASE_URL, ROUTES } from "../../constants"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import { useFollowFeatures } from "../../hooks"
import { Link } from "react-router-dom"

type FollowCard = {
  followData: User
}

const FollowCard: React.FC<FollowCard> = ({ followData }) => {
  const currentUser = useSelector(selectCurrent)
  const { follow, unfollow, isLoading } = useFollowFeatures()

  if (!currentUser) {
    return null
  }

  const isDisableBtn = followData.id === currentUser.id

  const isFollow =
    !isDisableBtn &&
    currentUser.following.some(user => user.following.id === followData.id)

  const followHandler = () => {
    isFollow ? unfollow(followData.id) : follow(followData.id)
  }

  return (
    <Card>
      <CardHeader className="justify-between">
        <Link to={ROUTES.USER_URL(followData.id)} className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={BASE_URL + followData.avatarUrl}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {followData.name}
            </h4>
          </div>
        </Link>
        <Button
          color={isDisableBtn ? "warning" : isFollow ? "danger" : "primary"}
          radius="full"
          size="sm"
          isLoading={isLoading}
          onClick={followHandler}
          disabled={isDisableBtn}
        >
          {isDisableBtn ? "It's you" : isFollow ? "Unfollow" : "Follow"}
        </Button>
      </CardHeader>
    </Card>
  )
}

export default FollowCard
