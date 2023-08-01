import { Box, Button, Modal, Stack, Text, Title } from "@mantine/core";
import { useRecoilState } from "recoil";
import { techSelectModalOpenState } from "../atoms/navAtom";


export default function TechSelect(props: { options: Tech[], onSelected: (option: Tech) => void }) {

  const [opened, setOpened] = useRecoilState(techSelectModalOpenState);

  return (
    <Modal opened={opened} onClose={() => {setOpened(false)}} title={<Title order={3}>Select a Tech Advancement</Title>}>
      
      <Stack>
        {props.options.map((option, inbox) => (
          <Box key={inbox}>
            <Button onClick={() => {
              props.onSelected(option);
              setOpened(false);
            }} compact>{option.name}</Button>
            <Text fz='sm'>{option.description}</Text>
          </Box>
        ))}
      </Stack>

    </Modal>
  )

}

