
import { useState } from 'react'
import axios from 'axios'

import { HttpRequestInput } from './httpRequest'
import { NewUser } from '../models/user'
import useHttpRequest from './httpRequest'

const registerUser = (
  httpRequestInput: HttpRequestInput, 
  user: NewUser
  ) => {
    
    const registerUserResult = useHttpRequest(httpRequestInput);

    console.log(registerUserResult);

    return;
}

export default registerUser 