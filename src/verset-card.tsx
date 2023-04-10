import { Card, Title } from "@mantine/core";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Props {
  distance: number;
  pointer: number;
  content: string;
}

const VersetCard = (props: Props) => {
  const { distance, pointer, content } = props;

  const [result, setResult] = useState<string>("");
  useEffect(() => {
    axios
      .get<string>("http://127.0.0.1:8000/pointer", {
        params: {
          q: pointer,
        },
      })
      .then((res) => {
        setResult(res.data);
      });
  }, [pointer]);

  return (
    <Card>
      <Title order={3} mb={8}>{result}</Title>
      {content}
    </Card>
  );
};

export default VersetCard;
