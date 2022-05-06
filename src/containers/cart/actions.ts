import { Constants } from "../../constant";

export const initiateOrder = () => {
  return {
    type: Constants.INITIATE_ORDER,
  };
};
