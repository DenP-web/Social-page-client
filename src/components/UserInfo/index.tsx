import React from "react"
import { Link } from "react-router-dom"
import { Button, Image } from "@nextui-org/react"
import { BASE_URL, ROUTES } from "../../constants"
import { User } from "../../app/types"
import useFollowFeatures from "../../hooks/useFollowFeatures"

type UserInfoProps = {
  data: User | undefined
  updateBtn: boolean
}

const UserInfo: React.FC<UserInfoProps> = ({ data, updateBtn }) => {
  const { follow, unfollow, isLoading, error } = useFollowFeatures()

  if (!data) {
    return null
  }

  const followsFeaturesHandle = () => {
    if (data.isFollowing) {
      unfollow(data.id)
    } else {
      follow(data.id)
    }
  }

  return (
    <section>
      <div className=" flex gap-10 p-10 border-2">
        <div className="max-w-[300px] w-full flex flex-col items-center gap-2">
          <p>{data.name}</p>

          <Image src={BASE_URL + data.avatarUrl} />
          {updateBtn ? (
            <Button className="w-6" color="primary">
              Update
            </Button>
          ) : (
            <Button
              className="w-6"
              color="primary"
              onClick={followsFeaturesHandle}
              isLoading={isLoading}
            >
              {data.isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>

        <div className="w-full flex flex-col items-center gap-10">
          <div className="flex justify-between w-full max-w-[300px]">
            <Link to={ROUTES.FOLLOWER_URL(data.id)}>
              Followers: <span>{data.followers.length}</span>
            </Link>

            <Link to={ROUTES.FOLLOWING_URL(data.id)}>
              Followings: <span>{data.following.length}</span>
            </Link>
          </div>
          <ul className="text-start">
            {data.bio && (
              <li className="flex justify-between">
                <span className="font-bold">About me</span>
                <p className="font-normal">{data.bio}</p>
              </li>
            )}
            {data.location && (
              <li className="flex justify-between">
                <span className="font-bold">Location</span>
                <p className="font-normal">{data.location}</p>
              </li>
            )}
            {data.dateOfBirth && (
              <li className="flex justify-between">
                <span className="font-bold">My date of birth</span>
                <p className="font-normal">{data.dateOfBirth}</p>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default UserInfo
