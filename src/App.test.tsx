import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Homepage from "./components/Homepage";
import DownpourEmoji from "./components/DownpourEmoji";

test("it should show loading text on Homepage", () => {
  render(<Homepage />);
  const loadingElement = screen.getByText("Henter vejrdata...");
  expect(loadingElement).toBeInTheDocument();
});

test("it should show error message on Homepage when error occurs", () => {
  // Mocker fetch der slår fejl
  global.fetch = jest.fn(() => Promise.reject("sry no api 4 u")) as jest.Mock;

  render(<Homepage />);
  const errorElement = screen.findByText(
    "Fejl i WeatherData fetch, tjek konsollen",
  );
  expect(errorElement).toBeDefined();
});

test.skip("it should render sun emoji with condition 0", () => {
  render(<DownpourEmoji condition={0} />);
  const emojiElement = screen.getByText("☀️");
  expect(emojiElement).toBeInTheDocument();
});

test("it should render rain emoji with condition 61", () => {
  render(<DownpourEmoji condition={61} />);
  const rainEmojiElement = screen.getByText("🌧️");
  expect(rainEmojiElement).toBeInTheDocument();
});

test.skip("it should render snow emoji with condition 71", () => {
  render(<DownpourEmoji condition={71} />);
  const snowEmojiElement = screen.getByText("❄️");
  expect(snowEmojiElement).toBeInTheDocument();
});

test("it should render unknown emoji with undefined condition", () => {
  render(<DownpourEmoji condition={undefined} />);
  const unknownEmojiElement = screen.getByText("❓");
  expect(unknownEmojiElement).toBeInTheDocument();
});
