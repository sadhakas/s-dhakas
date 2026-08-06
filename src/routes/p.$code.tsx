import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/p/$code")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/register-tmol-2k26",
      search: { code: params.code },
    });
  },
});
