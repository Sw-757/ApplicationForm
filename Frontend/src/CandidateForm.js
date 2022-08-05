import { Box, ButtonGroup, Radio, SimpleGrid } from '@chakra-ui/react';
import { Formik } from 'formik';
import {
  CheckboxContainer,
  CheckboxControl,
  CheckboxSingleControl,
  InputControl,
  NumberInputControl,
  PercentComplete,
  RadioGroupControl,
  ResetButton,
  SelectControl,
  SliderControl,
  SubmitButton,
  SwitchControl,
  TextareaControl,
} from 'formik-chakra-ui';
import * as React from 'react';
import { Input } from '@chakra-ui/react';
import axios from 'axios';

// const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));



var formData = new FormData();




const onSubmit = values => {
  var imagefile = document.querySelector('#file');
formData.append("resume", imagefile.files[0]);
formData.append("name", values.name);
formData.append("primary_role", values.primaryRole);
formData.append("state", values.state);
formData.append("city", values.city);
formData.append("bio", values.bio);
formData.append("number", values.number);
formData.append("email", values.email);
formData.append("linkd_url", values.linkedin_url);
formData.append("past_exp", values.past_exp);
formData.append("add_det", values.add_det);


  // axios.post('http://localhost:8000/well/',values)
  // .then((response) => {
  //   // setPost(response.data);
  // });
  axios.post('http://localhost:8000/well/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }

})

window.location.reload()

};

const initialValues = {
  name: '',
  primaryRole: '',
  state: '',
  city: '',
  bio: '',
  email: '',
  linkedin_url: '',
  number: '',
  past_exp: '',
  add_det: '',
  status: '',
};

const Form = () => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit, values, errors }) => (
        <Box as="form" onSubmit={handleSubmit}>
          <SimpleGrid columns={2} spacing={2}>
            <InputControl name="name" label="Name" />
            <InputControl name="primaryRole" label="Primary Role" />
            <InputControl name="state" label="State" />
            <InputControl name="city" label="City" />
            <InputControl name="bio" label="Bio" />
            <InputControl name="number" label="Number" />
            <InputControl name="email" label="Email" />
            <InputControl name="linkedin_url" label="Linkedin Url" />
          </SimpleGrid>
          <InputControl name="past_exp" label="Past Experience" />
          <InputControl name="add_det" label="Additional Detail" />
          <Input type="file" id="file" label="Resume" my="5%"/> 

          <ButtonGroup my="5%" w="100%" mx="auto">
            <SubmitButton>Submit</SubmitButton>
            <ResetButton>Reset</ResetButton>
          </ButtonGroup>

          {/* <Box as="pre" marginY={10}>
            {JSON.stringify(values, null, 2)}
            <br />
            {JSON.stringify(errors, null, 2)}
          </Box> */}
        </Box>
      )}
    </Formik>
  );
};

export default Form;
