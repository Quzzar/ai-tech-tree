import { GraphCanvas } from "reagraph";
import { useRecoilState } from "recoil";
import { techTreeState, yearState } from "./atoms/techAtom";
import { useEffect, useState } from "react";
import { getGraphEdges, getGraphNodes } from "./tech-tree/graph-utils";
import {
  generateNextTechOptions,
  getRecentTech,
  removeDuplicateTech,
} from "./tech-tree/generation";
import { Box, Text, Stack, Button } from "@mantine/core";
import TechSelect from "./tech-tree/TechSelect";
import { techSelectModalOpenState } from "./atoms/navAtom";

function App() {
  const [techTree, setTechTree] = useRecoilState(techTreeState);
  const [year, setYear] = useRecoilState(yearState);

  const [loading, setLoading] = useState(false);
  const [_, setOpened] = useRecoilState(techSelectModalOpenState);
  const [techOptions, setTechOptions] = useState<Tech[]>([]);

  console.log(techTree);
  console.log(year);

  return (
    <Stack>
      <Box h={'80vh'}>
        <GraphCanvas
          layoutType="treeLr2d"
          edgeInterpolation="curved"
          nodes={getGraphNodes(techTree)}
          edges={getGraphEdges(techTree)}
        />
      </Box>
      <Button
        m='md'
        loading={loading}
        onClick={async () => {
          setLoading(true);
          const options = await generateNextTechOptions(
            getRecentTech(techTree, 50),
            year
          );
          setTechOptions(options);
          setOpened(true);
          setLoading(false);
        }}
        sx={{ position: "absolute", bottom: 0, left: 0 }}
      >
        Research New Tech
      </Button>
      <TechSelect options={techOptions} onSelected={(option) => {
        setTechTree(removeDuplicateTech([...techTree, option]));
        setYear(option.year);
      }} />
    </Stack>
  );
}

export default App;
