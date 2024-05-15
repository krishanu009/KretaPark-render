import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const UploadPage = () => {

    const [selectedVideo, setSelectedVideo] = useState(false);

    const [uploadObject, setUploadObject] = useState({
        youTubeInfo: { title: "", description: "", tags: "" },
        facebookInfo: { title: "", description: "", tags: "" },
        instaInfo: { title: "", description: "", tags: "" }
    })
    const [activeTab, setActiveTab] = useState('facebook');

    const handleVideoSelection = (e) => {
        const file = e.target.files[0];

        if (file) {
            setSelectedVideo(URL.createObjectURL(file));
        } else {
            setSelectedVideo(null);
        }
    };

    const inputEntry = (event) => {

        let tempObject = { ...uploadObject };
        if (event.target.name === "youtubeTitle") {

            tempObject.youTubeInfo.title = event.target.value;

        }
        else if (event.target.name === "youtubeDesc") {

            tempObject.youTubeInfo.description = event.target.value;

        }
        else if (event.target.name === "youtubeTags") {

            tempObject.youTubeInfo.tags = event.target.value;

        }

        else if (event.target.name === "facebookTitle") {

            tempObject.facebookInfo.title = event.target.value;

        }
        else if (event.target.name === "facebookDesc") {

            tempObject.facebookInfo.description = event.target.value;

        }
        else if (event.target.name === "facebookTags") {

            tempObject.facebookInfo.tags = event.target.value;

        }

        else if (event.target.name === "instagramTitle") {

            tempObject.instaInfo.title = event.target.value;

        }
        else if (event.target.name === "instagramDesc") {

            tempObject.instaInfo.description = event.target.value;

        }
        else if (event.target.name === "instagramTags") {

            tempObject.instaInfo.tags = event.target.value;

        }
        console.log(event.target.name);
        console.log(tempObject);
        setUploadObject(tempObject);
    };

    const handleTabSelect = (key) => {
        setActiveTab(key);
        console.log(key);
    };


    return (
        <Container>
            <div className='upload-page-body'>
            <Row>
                <Col>
                    <Form.Group controlId="formFile" className="mb-3" data-bs-theme="dark">
                        <Form.Label>Upload a video</Form.Label>
                        <Form.Control type="file" accept="video/*" onChange={handleVideoSelection} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col lg={6} xs={12}>
                    <Row>
                        {selectedVideo ? (
                            <><div>
                                <h2>Video Preview:</h2>
                                <video controls src={selectedVideo} width="400" height="300"></video>
                            </div></>
                        ) : (
                            <div className='noVideo'>


                            </div>
                        )}
                    </Row>
                    <Row style={{ marginTop: '10px' }}>
                        <Col lg={1} xs={4}>

                            <button type="button" class="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-plus" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 5.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V10a.5.5 0 0 1-1 0V8.5H6a.5.5 0 0 1 0-1h1.5V6a.5.5 0 0 1 .5-.5z" />
                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                            </svg></button>

                        </Col>
                        <Col lg={1} xs={4}>

                            <button type="button" class="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-text" viewBox="0 0 16 16">
                                <path d="M5 4a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm-.5 2.5A.5.5 0 0 1 5 6h6a.5.5 0 0 1 0 1H5a.5.5 0 0 1-.5-.5zM5 8a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z" />
                                <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z" />
                            </svg></button>

                        </Col>
                        <Col lg={1} xs={4}>

                            <button type="button" class="btn btn-secondary"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg></button>

                        </Col>
                        
                    </Row>

                </Col>
                <Col lg={6} xs={12}>
                    {/* <Accordion defaultActiveKey="0" data-bs-theme="dark">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Accordion Item #2</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="3">
                            <Accordion.Header>Accordion Item #3</Accordion.Header>
                            <Accordion.Body>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion> */}

                    <Tabs
                        defaultActiveKey="youtube"
                        id="uncontrolled-tab-example"
                        className="mb-3" data-bs-theme="dark"
                        onSelect={(key) => handleTabSelect(key)}
                    >
                        <Tab eventKey="youtube" title="YouTube" >
                            <Row>
                                <Form data-bs-theme="dark">
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control name="youtubeTitle" type="text" placeholder="Title" value={uploadObject.youTubeInfo.title} onChange={inputEntry} />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control name="youtubeDesc" as="textarea" rows={3} value={uploadObject.youTubeInfo.description} onChange={inputEntry} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Tags</Form.Label>
                                        <Form.Control name="youtubeTags" type="text" placeholder="#tags" value={uploadObject.youTubeInfo.tags} onChange={inputEntry} />
                                    </Form.Group>
                                </Form>
                            </Row>
                        </Tab>
                        <Tab eventKey="facebook" title="FaceBook" >
                            <Form data-bs-theme="dark">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="facebookTitle" type="text" placeholder="Title" value={uploadObject.facebookInfo.title} onChange={inputEntry} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control name="facebookDesc" as="textarea" rows={3} value={uploadObject.facebookInfo.description} onChange={inputEntry} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control name="facebookTags" type="text" placeholder="#tags" value={uploadObject.facebookInfo.tags} onChange={inputEntry} />
                                </Form.Group>
                            </Form>
                        </Tab>
                        <Tab eventKey="instagram" title="Instagram" >
                            <Form data-bs-theme="dark">
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control name="instagramTitle" type="text" placeholder="Title" value={uploadObject.instaInfo.title} onChange={inputEntry} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control name="instagramDesc" as="textarea" rows={3} value={uploadObject.instaInfo.description} onChange={inputEntry} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Tags</Form.Label>
                                    <Form.Control name="instagramTags" type="text" placeholder="#tags" value={uploadObject.instaInfo.tags} onChange={inputEntry} />
                                </Form.Group>
                            </Form>
                        </Tab>
                    </Tabs>
                </Col>

            </Row>
            </div>
        </Container>
    )
}

export default UploadPage