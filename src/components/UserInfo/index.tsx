import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import { Button, Image } from "@nextui-org/react"
import { BASE_URL, ROUTES } from "../../constants"

const UserInfo: React.FC = () => {
  const user = useSelector(selectCurrent)
  const navigate = useNavigate()

  if (!user) {
    navigate(ROUTES.REGISTRATION_URL)
    return null
  }

  return (
    <section>
      <div className=" flex gap-10 p-10 border-2">
        <div className=" w-[400px] flex flex-col items-center gap-2">
          <p>{user.name}</p>

          <Image src={BASE_URL + user.avatarUrl} />

          <Button className="w-6" color="primary">
            {user.isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>

        <div className="w-full flex justify-center">
          <div>
            <Link to={ROUTES.FOLLOWER_URL}>
              Followers: <span>{user.followers.length}</span>
            </Link>

            <Link to={ROUTES.FOLLOWING_URL}>
              Followings: <span>{user.following.length}</span>
            </Link>
          </div>
          <div>
            <p>{user.bio}</p>
            <p>{user.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default UserInfo
