import {
  AppShell,
  MantineProvider,
  Text,
  Card,
  Container,
  LoadingOverlay,
  Flex,
} from "@mantine/core";
import { MyHeader } from "./header";
import { useEffect, useState } from "react";
import axios from "axios";
import VersetCard from "./verset-card";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<
    { distance: number; pointer: number; content: string }[]
  >([]);
  const handleSearch = (searchValue: string) => {
    setLoading(true);
    axios
      .get<{ distance: number; pointer: number; content: string }[]>(
        "http://127.0.0.1:8000/search",
        {
          params: {
            q: searchValue,
          },
        }
      )
      .then((res) => {
        setResults(res.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AppShell
        padding="md"
        header={
          <MyHeader
            links={[
              {
                label: "Fafana",
                link: "#",
                onClick: () => {
                  setResults([]);
                },
              },
            ]}
            onSearch={handleSearch}
          />
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        })}
      >
        <Container>
          <LoadingOverlay visible={loading} overlayBlur={2} />
          <Flex gap="md" direction="column">
            {results.map((result) => (
              <VersetCard {...result} />
            ))}
          </Flex>
        </Container>
      </AppShell>
    </MantineProvider>
  );
}
