import React from "react";

import { renderWithReduxAndRouter, userEvent } from "../../../utils/test-utils";
import Input from "..";

describe("<Input />", () => {
  it("is defined", () => {
    expect(<Input />).toBeDefined();
  });

  it("can be accessed by the label", () => {
    const { getByLabelText } = renderWithReduxAndRouter(
      <Input label="Email" id="email" />,
    );
    const input = getByLabelText("Email");
    expect(input).toBeInTheDocument();
  });

  it("defines a default type of text", () => {
    const { getByLabelText } = renderWithReduxAndRouter(
      <Input label="Email" id="email" />,
    );
    const input = getByLabelText("Email");
    expect(input).toHaveAttribute("type", "text");
  });

  it("assigns the specified type of input", () => {
    const { getByLabelText } = renderWithReduxAndRouter(
      <Input label="Email" id="email" type="email" />,
    );
    const input = getByLabelText("Email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("sets the specified placeholder value", () => {
    const { getByPlaceholderText } = renderWithReduxAndRouter(
      <Input label="Email" id="email" type="email" placeholder="Email" />,
    );
    const input = getByPlaceholderText("Email");
    expect(input).toBeInTheDocument();
  });

  it("forwards all the other props", () => {
    const { getByLabelText } = renderWithReduxAndRouter(
      <Input
        label="Email"
        id="email"
        type="email"
        aria-label="my special input"
      />,
    );
    const input = getByLabelText("my special input");
    expect(input).toBeInTheDocument();
  });

  it("assigns the value received and the onChange handler", () => {
    const handleChange = jest.fn();
    const value = "hello-mundo";

    const { getByDisplayValue } = renderWithReduxAndRouter(
      <Input
        label="Email"
        id="email"
        type="email"
        value={value}
        handleChange={handleChange}
      />,
    );
    const input = getByDisplayValue(value);
    expect(input).toBeInTheDocument();
  });

  it("calls the onChange handler when typing", () => {
    const handleChange = jest.fn();
    const value = "hello-mundo";

    const { getByDisplayValue } = renderWithReduxAndRouter(
      <Input
        label="Email"
        id="email"
        type="email"
        value={value}
        handleChange={handleChange}
      />,
    );
    const input = getByDisplayValue(value);
    userEvent.type(input, "hola");
    expect(handleChange).toHaveBeenCalled();
  });
});
