import React from "react"
import { Follow } from "../../app/types"
import FollowCard from "../FollowCard"
import { Chip } from "@nextui-org/react"

type FollowListProps = {
  data: Follow[]
  type: "follower" | "following"
  username: string
}

const FollowList: React.FC<FollowListProps> = ({ data, type, username }) => {
  if (data.length === 0) {
    return (
      <h1 className="text-center py-5">
        <Chip color="success">{username}</Chip>
        <Chip color="danger">is not {type}</Chip> <Chip>anyone yet.</Chip>
      </h1>
    )
  }

  return (
    <section>
      <div className="container mx-auto">
        <h1 className="text-center my-10"><Chip color="primary">{username} {type}:</Chip></h1>
        <ul className="flex flex-col items-center gap-2">
          {data.map((item: Follow) => (
            <li className="max-w-[600px] w-full" key={item.id}>
              <FollowCard followData={item[type]} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default FollowList
