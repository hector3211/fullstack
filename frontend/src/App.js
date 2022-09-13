import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Box,
  Text,
  Flex,
  Button,
  Center,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
const url = "http://localhost:8000/";
function App() {
  const [data, setData] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState("");
  const [inputAddVideo, setInputAddVideo] = useState("");
  const [popup, setPopup] = useState(false);
  const toast = useToast();
  useEffect(() => {
    const getData = async () => {
      let newUrl = `${url}videos`;
      await axios
        .get(newUrl)
        .then((response) => {
          setData(response.data.videos);
          setHydrated(true);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, [hydrated]);
  const openPopup = () => {
    setPopup(true);
  };
  const addVideo = async (name) => {
    let newUrl = `${url}addvideo`;
    await axios
      .post(newUrl, {
        Name: name,
      })
      .then(() => {
        setHydrated(false);
        setPopup(false);
        toast({
          title: `Successfully added video`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => console.log(error));
  };
  const handleNameChange = (event) => {
    let newName = event.target.value;
    setInput(newName);
    console.log(newName);
  };
  const updateVideoName = async (id, newName) => {
    let newUrl = `${url}video/${id}`;
    await axios
      .put(newUrl, {
        Name: newName,
      })
      .then((response) => {
        console.log(response);
        setHydrated(false);
        toast({
          title: `Updated video ID:${id}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => console.log(error));
  };
  const deleteVideo = async (id) => {
    let newUrl = `${url}video/${id}`;
    await axios.delete(newUrl).then(() => {
      toast({
        title: `delete video ID:${id}`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setHydrated(false);
    });
  };
  return (
    <Box bgColor={"gray.600"} minH={"100vh"} maxW={"100%"}>
      <Box position={"relative"} top={"0"}>
        {hydrated &&
          data.map((product, index) => (
            <Flex key={index} justifyContent={"space-evenly"} align={"center"}>
              <Text fontSize={"2rem"}>Name: {product.Name}</Text>
              <Text fontSize={"2rem"}>ID: {product.ID}</Text>
              <InputGroup size="sm" width={"40%"}>
                <Input
                  color="white"
                  rounded={"5"}
                  placeholder="enter new video name"
                  onChange={(event) => handleNameChange(event)}
                />
                <Button
                  mx={"3"}
                  size={"sm"}
                  colorScheme={"green"}
                  onClick={() => updateVideoName(product.ID, input)}
                >
                  Update Name
                </Button>
              </InputGroup>
              <Button
                onClick={() => deleteVideo(product.ID)}
                size={"sm"}
                colorScheme={"green"}
              >
                Delete
              </Button>
            </Flex>
          ))}
        <Center mt={"10"}>
          <Button onClick={openPopup} size={"lg"} colorScheme={"blue"}>
            Add Video
          </Button>
        </Center>
        {popup && (
          <Center>
            <InputGroup maxW={"40%"} position={"relative"} bottom={"-20"}>
              <Input
                color="white"
                placeholder="Enter a name to Create a new video"
                onChange={(e) => setInputAddVideo(e.target.value)}
              />
              <Button
                colorScheme={"green"}
                mx={"3"}
                onClick={() => addVideo(inputAddVideo)}
              >
                Enter
              </Button>
            </InputGroup>
          </Center>
        )}
      </Box>
    </Box>
  );
}

export default App;
