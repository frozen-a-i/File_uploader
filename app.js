import express from 'express'

const app = express();
import multer from 'multer'
import { getUsers, getUser, createUser, findFile, uploadFile } from './user.js'
app.use(express.json())



// diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, '/public')
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.originalname)
//         console.log(file.originalname, 'is here')
//     }
// })

const upload = multer({ dest:"public/" })


//registration
app.post('/user', async (req, res) => {
    const { username, email } = req.body


    const user = await createUser(username, email)

    res.status(201).send(user)
})

//file upload
app.post('/uploads', upload.single('file'), async (req, res) => {
    const fname = req.file.originalname
    console.log(fname)

    const user_id = req.body

    const file = await uploadFile(user_id, fname)

    res.status(201).send(file)
})

app.get('/user', async (req, res) => {
    const users = await getUsers()
    res.send(users)
})

//get user with email
app.get('/user/:mail', async (req, res) => {
    const mail = req.params.mail
    const user = await getUser(mail)
    res.send(user)
})
//file find

app.get('/user/image/:img', async (req, res) => {
    const file_name=req.params.img
    const result = await findFile(file_name)
    res.send(result)
})



//file
// app.post('/user/:mail', upload.single('file'), async (req, res) => {

//     const [result] = findFile(req.file)
//     console.log(req.body, req.file)
//     res.send(result)
// })


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})