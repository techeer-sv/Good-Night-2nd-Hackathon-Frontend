"use client";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { koKR } from "@mui/x-date-pickers/locales";
import dayjs, { Dayjs } from "dayjs";
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

type SubmitProps = {
  params: { id: number };
  searchParams: {};
};

export default function Submit({ params, searchParams }: SubmitProps) {
  const [title, setTitle] = useState<string>("");
  const [genre, setGenre] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<Dayjs | null>(null);
  const [endDate, setEndDate] = useState<Dayjs | null>(null);
  const [isShowing, setIsShowing] = useState<boolean>(false);

  const theme = createTheme({
    palette: {
      primary: {
        main: "#8982F2",
      },
    },
    koKR,
  });

  async function getMovie() {
    const url = `http://localhost:8000/movies/${params.id}`;
    try {
      const dataRes = await fetch(url);
      if (!dataRes.ok) {
        throw new Error(`HTTP error! Status: ${dataRes.status}`);
      }
      const resJson = await dataRes.json();
      setTitle(resJson.title);
      setGenre(resJson.genre);
      setReleaseDate(dayjs(resJson.releaseDate));
      setEndDate(dayjs(resJson.endDate));
      setIsShowing(resJson.isShowing);
    } catch (error) {
      console.error(error);
      alert("영화 조회에 실패했습니다.");
    }
  }

  async function modifyMovie() {
    const url = `http://localhost:8000/movies/${params.id}`;
    const data = {
      title,
      genre,
      releaseDate: dayjs(releaseDate).format("YYYY-MM-DD"),
      endDate: dayjs(endDate).format("YYYY-MM-DD"),
      isShowing,
    };
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      alert("영화 수정에 실패했습니다.");
    }
  }

  useEffect(() => {
    getMovie();
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
        <FormControl className="w-[200px] mr-4 mt-2">
          <InputLabel id="demo-simple-select-label">상영여부</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={isShowing}
            label="상영여부"
            onChange={(e) =>
              setIsShowing(e.target.value === "true" ? true : false)
            }
          >
            <MenuItem value={"true"}>상영중</MenuItem>
            <MenuItem value={"false"}>상영중지</MenuItem>
          </Select>
        </FormControl>
        <Button
          className="h-[56px] mt-2"
          variant="outlined"
          onClick={() => modifyMovie()}
        >
          수정
        </Button>
      </ThemeProvider>
    </div>
  );
}
