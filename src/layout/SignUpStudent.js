import { Container, Card, Input, Spacer, Button, Text, Link, Grid, Checkbox } from '@nextui-org/react';
import './css/signup.css';
import { React, useState, useEffect } from 'react';
import { UnLockIcon } from "./js/UnLockIcon.js";
import { LockIcon } from "./js/LockIcon.js";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import NotificationMessageProvider from './Provider/NotificationMessageProvider';
import { db, auth } from "./Firebase";
import { onSnapshot, getDocs, collection, addDoc } from "firebase/firestore";
import { isEmpty } from "validator";
import isEmail from 'validator/es/lib/isEmail';
import { useNotification } from './Provider/NotificationMessageProvider';
export default function SignUp() {
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");
    const [studentId, setstudentId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [checkBox, setCheckBox] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const dispatch = useNotification();
    const [colorInput, setColorInput] = useState({
        studentId: 'default',
        password: 'default',
        confirmPassword: 'default',
        firstName: 'default',
        lastName: 'default',
        email: 'default',
        checkbox: 'default'
    });
    const [errorMessage, setErrorMessage] = useState({
        studentId: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        email: '',
        checkbox: false
    });
    const handleNewNotification = () => {
        dispatch({
            type: "ERROR",
            message: inputVal,
            // title: "Successfull Request"
        })
    }
    const usersCollectionRef = collection(db, 'users');
    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);
    const handleConfirmPassword = (e) => {


        if (isEmpty(confirmPassword.trim())) {
            setConfirmPassword(e.target.value.trim());
            setErrorMessage({ confirmPassword: "Hãy nhập xác nhận mật khẩu" })
            setColorInput({ confirmPassword: 'error' });
        } else {
            if (password.trim() === e.target.value.trim()) {
                setErrorMessage({ password: "" });
                setColorInput({ password: 'default' });
            } else {

                setErrorMessage({ confirmPassword: "Mật khẩu xác nhận của bạn không khớp với mật khẩu bạn nhập ở mục trên!" })
                setColorInput({ confirmPassword: 'error' });
            }

        }
    }
    const handlestudentIdChange = (e) => {
        setstudentId(e.target.value.trim());
        if (isEmpty(studentId.trim())) {
            setErrorMessage({ studentId: "Hãy nhập tên đăng nhập vào đây!" })
            setColorInput({ studentId: 'error' });
        } else {
            setErrorMessage({ studentId: "" });
            setColorInput({ studentId: 'default' });
        }
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value.trim());
        if (isEmpty(password.trim())) {
            setErrorMessage({ password: "Hãy nhập mật khẩu vào đây!" })
            setColorInput({ password: 'error' });
        } else {
            setErrorMessage({ password: "" });
            setColorInput({ password: 'default' });
        }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value.trim());
        if (isEmpty(email.trim())) {
            setErrorMessage({ email: "Hãy nhập email vào đây!" })
            setColorInput({ email: 'error' });
        } else {
            if (isEmail(email.trim())) {
                setErrorMessage({ email: "" });
                setColorInput({ email: 'default' });
            } else {
                setErrorMessage({ email: "Email của bạn không hợp lệ!. Vui lòng nhập lại email của bạn." });
                setColorInput({ email: 'error' });
            }

        }
    }
    const handleFirstName = (e) => {
        setFirstName(e.target.value.trim());
        if (isEmpty(firstName.trim())) {
            setErrorMessage({ firstName: "Hãy nhập họ của bạn vào đây!" })
            setColorInput({ firstName: 'error' });
        } else {
            setErrorMessage({ firstName: "" });
            setColorInput({ firstName: 'default' });
        }
    }
    const handleLastName = (e) => {
        setFirstName(e.target.value.trim());
        if (isEmpty(lastName.trim())) {
            setErrorMessage({ lastName: "Hãy nhập tên của bạn vào đây!" })
            setColorInput({ lastName: 'error' });
        } else {
            setErrorMessage({ lastName: "" });
            setColorInput({ lastName: 'default' });
        }
    }
    const handleCheckBox = (e) => {
        if (checkBox === false) {
            setCheckBox(true);
        } else {
            setCheckBox(false);
        }
    }
    const validateInput = () => {
        handleConfirmPassword();
        handlestudentIdChange();
        handleFirstName();
        handleLastName();
        handlePasswordChange();
        handleEmailChange();
        handleCheckBox();

    };
    const SignUpPost = async () => {
        // validateInput();
        if (checkBox) {
            createUserWithEmailAndPassword(auth, studentId,password,confirmPassword,firstName,lastName,email,)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        } else {
            setErrorMessage({ checkbox: "Hãy tích vào ô phía trên!" })
            setColorInput({ checkbox: 'error' });
        }


    }
    return (
        <Container xl>
            <NotificationMessageProvider />
            <Container className="boxSignUp" xs>
                <Card css={{ mw: "600px", w: "90%", p: "$6" }}>
                    <Card.Header css={{ mw: "550px", w: "100%", p: "$6" }} className="cardHeader">
                        <Text h1>Đăng Ký</Text>
                    </Card.Header>
                    <Card.Body css={{ mw: "550px", w: "90%", p: "$6" }} className="cardBody">
                        <Spacer y={1.5} />
                        <Grid.Container fluid gap={1} justify="space-between" css={{ padding: '$0', w: "100%", mw: '100%' }}>
                            <Grid fluid>
                                <div className="boxInputName">
                                    <Input rounded bordered color={colorInput.firstName} css={{ mw: "480px", w: "98%" }} labelPlaceholder="Họ" className="firstname" initialValue="" onChange={handleFirstName} />
                                    <Spacer y={0.5} />
                                    <Text color="error"> {errorMessage.firstName} </Text>
                                    <Spacer y={1.0} />
                                </div>
                            </Grid>

                            <Grid fluid>
                                <div className="boxInputName">
                                    <Input rounded bordered color={colorInput.lastName} css={{ mw: "480px", w: "98%" }} labelPlaceholder="Tên" className="lastname" initialValue="" onChange={handleLastName} />
                                    <Spacer y={0.5} />
                                    <Text color="error"> {errorMessage.lastName} </Text>
                                    <Spacer y={1.0} />
                                </div>
                            </Grid>
                        </Grid.Container>
                        <Spacer y={1.5} />
                        <Input rounded bordered color={colorInput.studentId} css={{ w: "100%" }} labelPlaceholder="Tên đăng nhập" name="studentId" className="studentId" initialValue="" onChange={handlestudentIdChange} type="text" />
                        <Spacer y={0.5} />
                        <Text color="error"> {errorMessage.studentId} </Text>
                        <Spacer y={1.5} />
                        <Input rounded bordered color={colorInput.email} css={{ w: "100%" }} labelPlaceholder="Email" name="email" className="email" initialValue="" onChange={handleEmailChange} type="email" />
                        <Spacer y={0.5} />
                        <Text color="error"> {errorMessage.email} </Text>
                        <Spacer y={1.5} />
                        <Input.Password rounded bordered color={colorInput.password} css={{ w: "100%" }} labelPlaceholder="Mật khẩu" name="password" initialValue="" onChange={handlePasswordChange} />
                        <Spacer y={0.5} />
                        <Text color="error"> {errorMessage.password} </Text>
                        <Spacer y={1.5} />
                        <Input.Password rounded bordered color={colorInput.confirmPassword} css={{ w: "100%" }} labelPlaceholder="Xác nhận mật khẩu" name="confirmpassword" initialValue="" onChange={handleConfirmPassword} />
                        <Spacer y={0.5} />
                        <Text color="error"> {errorMessage.confirmPassword}</Text>
                        <Spacer y={0.5} />
                        <Checkbox color="primary" defaultSelected={checkBox} size="xs" onChange={handleCheckBox}>Tôi đồng ý với điều khoản và chính sách của chúng tôi</Checkbox>
                        <Spacer y={0.5} />
                        <Text color="error"> {errorMessage.checkbox}</Text>
                        <Spacer y={1.0} />
                        <Button color="primary" onClick={SignUpPost}>Đăng ký</Button>
                        <Spacer y={1.0} />
                        <Text >Bạn đã có tài khoản ? <Link href="/login">Đăng nhập ngay </Link></Text>
                    </Card.Body>
                </Card>

            </Container>
        </Container>
    );
}