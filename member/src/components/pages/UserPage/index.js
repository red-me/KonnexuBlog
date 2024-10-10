import { Button, Card, Typography } from '@material-tailwind/react'
import ProfileCard from "../../user/ProfileCard"
import Settings from "../../user/Settings"
import React, { useEffect, useContext, useState } from 'react'

import AuthContext from '../../../context/AuthContext'
import UserContext from '../../../context/UserContext'

const Preloader = () => {
  return <Card className='w-full p-4 mt-4'>
    <div className="max-w-full animate-pulse">
      <Typography
        as="div"
        variant="h1"
        className="mb-4 h-3 w-1/2 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-full rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-full rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-1/2 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
      <Typography
        as="div"
        variant="paragraph"
        className="mb-2 h-2 w-72 rounded-full bg-gray-300"
      >
        &nbsp;
      </Typography>
    </div></Card>
}

export default function index({ params, currentUserId }) {
  const { user: currentUser, checkUserLoggedIn } = useContext(AuthContext)
  const { user, getUserByName, getUserById, updateUser, updatePassword, isError, isLoading } = useContext(UserContext)
  const { slug } = params;
  const [userView, setUserView] = useState([])
  const [whichUser, setWhichUser] = useState(null)

  const [theUser, setTheUser] = useState(null)

  const [view, setView] = useState('profile')

  useEffect(() => {


    if (slug) {
      if (slug[0] == 'user') {
        if (slug.length == 1) {
          //url= /user  // must use current
          setUserView('user-profile')

          setWhichUser('current')
        }
        else if (slug.length > 1) {
          if (slug[1] == 'settings') {
            setUserView('user-settings')
            setWhichUser('current')
          }
          else if (!isNaN(+slug[1])) {
            //slug[1] is a number, the user id...
            setUserView('user-profile')
            setWhichUser('other')
          }

        }

      }
      else {
        setWhichUser('other')
        setUserView('user-profile')
      }
    }


  }, [slug])

  useEffect(() => {
    if (whichUser) {
      if (whichUser == 'current') {

        //get by id of current user
        (async () => {
          try {

            if (currentUser) {
              //  const id = parseInt(slug[1])
              await getUserById(currentUser.id)
            }

          } catch (err) {
            console.log('Error occurred when fetching user');
          }
        })();

      }
      else {
        if (slug[0] == 'user') {
          //get by id
          (async () => {
            try {

              const id = parseInt(slug[1])
              await getUserById(id)


            } catch (err) {
              console.log('Error occurred when fetching user');
            }
          })();
        }
        else {
          // get user by name

          (async () => {
            try {
              const name = slug[0]
              await getUserByName(name)

            } catch (err) {
              console.log('Error occurred when fetching user');
            }
          })();
        }
      }
    }


  }, [whichUser, currentUser])





  return (<>
    <div className="mx-auto w-full  max-w-screen-xl  flex flex-col gap-2">
      {user && <>
        {userView == 'user-profile' && <ProfileCard user={user} view={view} setView={setView} ></ProfileCard>}

      </>}

      {userView == 'user-settings' && <Settings user={user} currentUserId={currentUser ? currentUser.id : 0} refreshCurrentUser={checkUserLoggedIn} update={updateUser} updatePassword={updatePassword} isError={isError} isLoading={isLoading}></Settings>}
    </div>
  </>
  )
}


