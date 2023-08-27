"use client";

import { useRouter } from "next/navigation";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { koKR } from "@mui/x-date-pickers/locales";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import "dayjs/locale/ko";

declare module "@mui/material/styles" {
  interface ThemeOptions {
    koKR?: any;
  }
}

export default function Submit() {
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const router = useRouter();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#8982F2",
      },
    },
    koKR,
  });

  async function submitMovie() {
    const url = `${baseURL}/movies`;
    const data = {
      title,
      genre,
      releaseDate: dayjs(releaseDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      router.push("/");
    } catch (error) {
      console.error(error);
      alert("영화 등록에 실패했습니다.");
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("isAdmin")) {
      router.push("/");
      alert("관리자만 접근 가능합니다.");
    }
  }, []);

  return (
    <div className="pt-4 pl-4">
      <ThemeProvider theme={theme}>
        <TextField
          className="mr-4 mt-2"
          id="outlined-basic"
          label="제목"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <FormControl className="w-[200px] mr-4 mt-2">
          <InputLabel id="demo-simple-select-label">장르</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={genre}
            label="장르"
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value={"스릴러"}>스릴러</MenuItem>
            <MenuItem value={"로맨스"}>로맨스</MenuItem>
            <MenuItem value={"코믹"}>코믹</MenuItem>
            <MenuItem value={"액션"}>액션</MenuItem>
          </Select>
        </FormControl>
        <LocalizationProvider
          dateAdapter={AdapterDayjs}
          adapterLocale="ko"
          localeText={
            koKR.components.MuiLocalizationProvider.defaultProps.localeText
          }
        >
          <DatePicker
            className="mr-4 mt-2"
            label="개봉일"
            value={releaseDate}
            onChange={(date) => setReleaseDate(date)}
            format="YYYY-MM-DD"
          />
          <DatePicker
            className="mr-4 mt-2"
            label="상영 종료일"
            value={endDate}
            onChange={(date) => setEndDate(date)}
            format="YYYY-MM-DD"
          />
        </LocalizationProvider>
        <Button
          className="h-[56px] mt-2"
          variant="outlined"
          onClick={() => submitMovie()}
        >
          등록
        </Button>
      </ThemeProvider>
    </div>
  );
}
