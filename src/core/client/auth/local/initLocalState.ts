import { commitLocalUpdate, Environment } from "relay-runtime";

import { parseQuery } from "talk-common/utils";
import {
  createAndRetain,
  LOCAL_ID,
  LOCAL_TYPE,
} from "talk-framework/lib/relay";

/**
 * Initializes the local state, before we start the App.
 */
export default async function initLocalState(environment: Environment) {
  commitLocalUpdate(environment, s => {
    const root = s.getRoot();

    // Create the Local Record which is the Root for the client states.
    const localRecord = createAndRetain(environment, s, LOCAL_ID, LOCAL_TYPE);

    // Parse query params
    const query = parseQuery(location.search);

    // Set default view.
    localRecord.setValue(query.view || "SIGN_IN", "view");

    root.setLinkedRecord(localRecord, "local");
  });
}