import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("framer-motion", () => {
  const React = require("react");
  const Mock = React.forwardRef(({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ));

  const motion = new Proxy(
    {},
    {
      get: () => Mock,
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }) => <>{children}</>,
    useScroll: () => ({ scrollYProgress: 0 }),
    useTransform: () => 1,
    useInView: () => true,
  };
});

describe("App frontend routes", () => {
  test("renders home page with primary navigation", () => {
    window.history.pushState({}, "", "/");
    render(<App />);

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Services/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Contact Us/i })).toBeInTheDocument();
  });

  test("renders services page route", () => {
    window.history.pushState({}, "", "/services");
    render(<App />);

    expect(screen.getByRole("heading", { name: /Our Services/i })).toBeInTheDocument();
  });

  test("renders doctors page route for a service", () => {
    window.history.pushState({}, "", "/doctors/relationship-counseling");
    render(<App />);

    expect(screen.getByRole("heading", { name: /Relationship Counseling - Our Experts/i })).toBeInTheDocument();
    expect(screen.getByText(/Dr\. Emily Carter/i)).toBeInTheDocument();
  });

  test("renders contact page route", () => {
    window.history.pushState({}, "", "/contact-us");
    render(<App />);

    expect(screen.getByRole("heading", { name: /Contact Us/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });
});
