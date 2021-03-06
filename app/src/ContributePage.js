import React from "react";

import { Drizzle } from '@drizzle/store';
import { drizzleReactHooks } from "@drizzle/react-plugin";
import drizzleOptions from "./drizzleOptions";

import LoadingContainer from './LoadingContainer.js';
import ICOInfo from './ICOInfo.js';
import Investor from './Investor.js';
import Admin from './Admin.js';

const drizzle = new Drizzle(drizzleOptions);
const { DrizzleProvider } = drizzleReactHooks;

function ContributePage() {
  return (
      <div >
        {/*<h1>Contribute</h1>*/}
        <DrizzleProvider drizzle={drizzle}>
          <LoadingContainer>
            {/*<ICOInfo />*/}
            <Investor />
            {/*<Admin />*/}
          </LoadingContainer>
        </DrizzleProvider>
      </div>
  );
}

export default ContributePage;
