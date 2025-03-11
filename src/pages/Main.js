import { MovieList } from "@/features/movies/components/MovieList";

import React, { useState } from "react";

function Main({ children }) {
  return <main className="main">{children}</main>;
}

export default Main;
