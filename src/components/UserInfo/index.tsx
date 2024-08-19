import React from "react"
import { Link } from "react-router-dom"
import { Button, Chip, Divider, Image } from "@nextui-org/react"
import { BASE_URL, ROUTES } from "../../constants"
import { User } from "../../app/types"
import useFollowFeatures from "../../hooks/useFollowFeatures"
import { useSelector } from "react-redux"
import { selectCurrent } from "../../app/selects/userSelects"
import LinkToMessages from "../LinkToMessages"

type UserInfoProps = {
  data: User | undefined
  updateBtn: boolean
  onOpen?: () => void
}

const UserInfo: React.FC<UserInfoProps> = ({ data, updateBtn, onOpen }) => {
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
      <div className=" flex items-center gap-10 p-10 border-2">
        <div className="max-w-[300px] w-full flex flex-col items-center gap-2">
          <h1 className="text-primary-500 font-mono font-semibold text-2xl mb-4">
            {data.name}
          </h1>

          <Image src={BASE_URL + data.avatarUrl} />
          {updateBtn ? (
            <Button className="w-6" color="primary" onClick={onOpen}>
              Update
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                className="w-6"
                color="primary"
                onClick={followsFeaturesHandle}
                isLoading={isLoading}
              >
                {data.isFollowing ? "Unfollow" : "Follow"}
              </Button>
              <LinkToMessages />
            </div>
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

          <ul className="text-start w-full max-w-[250px]">
            {data.location && (
              <li className="flex justify-between p-2 items-center">
                <span className="text-slate-950 font-bold">Location:</span>
                <Chip color="primary">
                  <p className="font-normal">{data.location}</p>
                </Chip>
              </li>
            )}
            <Divider />
            {data.dateOfBirth && (
              <li className="flex justify-between p-2">
                <span className="font-bold">Date of birth:</span>
                <Chip color="primary">
                  <p className="font-normal">
                    {new Date(data.dateOfBirth).toLocaleDateString()}
                  </p>
                </Chip>
              </li>
            )}
          </ul>

          {data.bio && (
            <>
              <div className="p-2 border-2 rounded-md max-w-[400px] w-full">
                <h5>Bio:</h5>
                <Divider className="mb-2" />
                <p>{data.bio}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default UserInfo
