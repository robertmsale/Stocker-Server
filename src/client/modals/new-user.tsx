import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import {useContext, useEffect, useRef, useState} from "react";
import {AppContext, socket} from "../App";
import {SocketClientMessages, SocketServerMessages} from "../../server/types/socket";
import {Prisma} from '@prisma/client'
import _ from 'lodash'


const CreateUserDialog = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [imageURL, setImageURL] = useState("")
    const state = useContext(AppContext)

    return <Dialog open={state.newUserDialogShown} onClose={() => state.setNewUserDialogShown(false)}>
        <DialogTitle>
            Create User
        </DialogTitle>
        <DialogContent>
            <Stack spacing={2}>
                <DialogContentText>
                    Enter the information below to create a new user
                </DialogContentText>
                <TextField
                    autoFocus
                    label={'Username'}
                    fullWidth
                    variant={'standard'}
                    value={username}
                    error={state.users.reduce((prev, curr) => prev || curr.username === username, false)}
                    onChange={e => setUsername(e.target.value)}
                />
                <TextField
                    label={'Email'}
                    fullWidth
                    variant={'standard'}
                    value={email}
                    type={'email'}
                    onChange={e => setEmail(e.target.value)}
                />
                <TextField
                    label={'Password'}
                    fullWidth
                    type={'password'}
                    variant={'standard'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <Stack direction={'row'} justifyContent={'space-around'}>
                    <img src={imageURL === '' ? '/vite.svg' : '/item-images/'+imageURL} width={64} height={64} />
                    <Button
                        onClick={() => {
                            const imginput = document.getElementById('imageInputUser') as HTMLInputElement
                            imginput.click()
                            imginput.onchange = () => {
                                const file = _.get(imginput, 'files[0]', undefined)
                                if (_.isUndefined(file)) return
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                    socket.on(SocketClientMessages.ReceiveProfileImageURL, url => {
                                        setImageURL(url)
                                        socket.off(SocketClientMessages.ReceiveProfileImageURL)
                                    })
                                    socket.emit(SocketServerMessages.UploadItemImage, reader.result)
                                }
                                reader.readAsDataURL(file)
                            }
                        }}
                    >
                        ⬅ Upload Image
                        <input id={'imageInputUser'} hidden accept={'image/*'} multiple={false} type={'file'} />
                    </Button>
                </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button
                color={'error'}
                onClick={() => state.setNewUserDialogShown(false)}
            >
                Cancel
            </Button>
            <Button
                onClick={() => {
                    state.setNewUserDialogShown(false)
                    socket.emit(SocketServerMessages.UserCreated, {
                        data: {
                            active: true,
                            username,
                            email,
                            password,
                            imageURL
                        }
                    } as Prisma.UserCreateArgs)
                }}
            >
                Submit
            </Button>
        </DialogActions>
    </Dialog>
}

export default CreateUserDialog