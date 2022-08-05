import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
// import 'primeflex/primeflex.css';
import './Table.css'
import ReactDOM from 'react-dom';
import axios from 'axios';

import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { ProductService } from './service/ProductService';
import { Button, ButtonGroup, Flex ,   Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, useDisclosure,  Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    Text,
    Stack,
    DrawerCloseButton, Input} from '@chakra-ui/react'
import CandidateForm from '../CandidateForm'

function ApplicationTable ()  {
    const [name, setName] = useState('');
    const [details, setDetails] = useState(null);
    const btnRef = React.useRef()
    // const { isOpen, onOpen, onClose } = useDisclosure()

    const { isOpen: isModalOpen , onOpen: onModalOpen, onClose: onModalClose } = useDisclosure()
    const { isOpen: isDrawerOpen , onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure()

    const [products, setProducts] = useState([]);
    const productService = new ProductService();


    useEffect(() => {

      axios.get('http://localhost:8000/well/')
.then(response => setProducts(response.data ));
console.log(products)
        productService.getProductsSmall().then(data => setProducts(data));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const statusTemplate = (rowData) => {
        console.log(rowData.status )
        return <span className={`product-badge status-${(rowData.status ? rowData.status.toLowerCase() : '')}`}>{rowData.status}</span>;
    }

    const profileTemplate = (rowData) => {
        
        return <Flex>
            <Button colorScheme='teal' size='sm' onClick={() => {  axios.get('http://localhost:8000/users/'+rowData.id+"/")
.then(response => setDetails(response.data ));console.log(details) ;onModalOpen();}}>Profile</Button>
            <Modal size="full" overflowX = {"scorll"} isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize='4xl' >{details && details.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody overflowY={"scroll"}>
         {details &&  <Stack spacing={3}>
 
 <Text fontSize='2xl'><b><u>Primary Role:</u></b> {details.primary_role}</Text>
 <Text  fontSize='2xl'><b><u>Bio:</u></b> {details.bio}</Text>
 <Text fontSize='xl'><b><u>Linkedin:</u></b> {details.linkd_url}</Text>
 <Text fontSize='xl'><b><u>Location:</u></b> {details.state},{details.city}</Text>
 <Text noOfLines={3} fontSize='2xl'><b><u>Past Experiences:</u></b> {details.past_exp}</Text>
 <Text noOfLines={3}fontSize='2xl'><b><u>Additional Details:</u></b> {details.add_det}</Text>
 <Text fontSize='xl'><b><u>Email:</u></b> {details.email}</Text>
 <Text  fontSize='xl'><b><u>Phone Number:</u></b> {details.number}</Text>
 
 
 
</Stack>}
          </ModalBody>
          <ModalFooter>
          <Button colorScheme='orange' width="20vw"  mr={"65%"} onClick={()=>{ window.open('http://localhost:8000'+details.resume, '_blank'); }}>
              View Resume
            </Button>
            <Button colorScheme='blue' mr={3} onClick={onModalClose}>
              Close
            </Button>
            <Button mr={"5px"} colorScheme={"green"} onClick={()=>{ axios.post('http://localhost:8000/status/',{
              id:details.id,
              status:"accepted", 
            } ); window.location.reload()  }}>Accept</Button>

            <Button colorScheme={"red"}onClick={()=>{ axios.post('http://localhost:8000/status/',{
              id:details.id,
              status:"rejected", 
            } ); window.location.reload()  }}>Reject</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
        </Flex>
    }

    
    return (
        <div style={{padding:"5%"}}>
            <Button my="1%" ref={btnRef} colorScheme='teal' onClick={onDrawerOpen} >Add Candidate</Button>
            <Drawer
        isOpen={isDrawerOpen}
        placement='right'
        onClose={onDrawerClose}
        finalFocusRef={btnRef}
        size='lg'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Enter Candidate Details</DrawerHeader>

          <DrawerBody>
            <CandidateForm />
          </DrawerBody>

          {/* <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter> */}
        </DrawerContent>
      </Drawer>
            
            <div className="card">
                <DataTable value={products} header="Scroll" responsiveLayout="scroll"  >
                   
                    <Column field="name" header="Name" />
                    <Column field="primary_role" header="Primary Role" />
                    <Column field="city" header="City" />
                    <Column field="email" header="Email" />
                    <Column field="status" header="Status" body={statusTemplate} />
                    {/* <Column field="rating" header="Rating" body={ratingTemplate} /> */}
                    <Column  header="View Profile" body={profileTemplate}/>
                </DataTable>
            </div>

           
        </div>
    );
}
         
export default ApplicationTable;
