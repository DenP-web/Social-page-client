import { Input, Tab, Tabs } from "@nextui-org/react"
import React, { useState } from "react"
import { useForm } from "react-hook-form"
import Login from "../Login"
import Register from "../Register"

type Inputs = {
  example: string
  exampleRequired: string
}

const AuthForm = () => {
  const [selectedTab, setSelectedTab] = useState<string>("login")

  return (
    <div className="w-[300px]">
      <Tabs
        fullWidth
        selectedKey={selectedTab}
        size="md"
        onSelectionChange={key => setSelectedTab(key as string)}
      >
        <Tab key={"log in"} title="Log In">
          <Login changeTab={() => setSelectedTab('sign up')} />
        </Tab>
        <Tab key={"sign up"} title="Sign up">
          <Register changeTab={() => setSelectedTab('log in')} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default AuthForm
