import React, { useEffect, useState } from "react";
import {
  InputGroup,
  Box,
  Text,
  Flex,
  Button,
  Center,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
function App() {
  const [data, setData] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [input, setInput] = useState("");
  useEffect(() => {
    const getData = async () => {
      let url = "http://localhost:8000/videos";
      await axios
        .get(url)
        .then((response) => {
          setData(response.data.videos);
          setHydrated(true);
        })
        .catch((error) => console.log(error));
    };
    getData();
  }, [hydrated]);
  const handleNameChange = (event) => {
    let newName = event.target.value;
    setInput(newName);
    console.log(newName);
  };
  const updateVideoName = async (id, newName) => {
    const url = "http://localhost:8000/video/" + id;
    await axios
      .put(url, {
        Name: newName,
      })
      .then((response) => {
        console.log(response);
        setHydrated(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <Box bgColor={"gray.600"} minH={"100vh"} maxW={"100%"}>
      <Box position={"relative"} top={"0"}>
        {hydrated &&
          data.map((product, index) => (
            <Flex key={index} justifyContent={"space-between"} align={"center"}>
              <Text fontSize={"2rem"}>Name: {product.Name}</Text>
              <Text fontSize={"2rem"}>ID: {product.ID}</Text>
              <InputGroup size="sm" width={"40%"}>
                <Input
                  placeholder="enter new video name"
                  onChange={(event) => handleNameChange(event)}
                />
                <Button
                  size={"sm"}
                  colorScheme={"green"}
                  onClick={() => updateVideoName(product.ID, input)}
                >
                  Update Name
                </Button>
              </InputGroup>
              <Button size={"sm"} colorScheme={"green"}>
                Delete
              </Button>
            </Flex>
          ))}
        <Center mt={"10"}>
          <Button size={"lg"} colorScheme={"blue"}>
            Add Video
          </Button>
        </Center>
      </Box>
    </Box>
  );
}

export default App;
