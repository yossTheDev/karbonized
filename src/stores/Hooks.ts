import { createTypedHooks } from 'easy-peasy';
import { AppStoreModel } from './AppStore';

const typedHooks = createTypedHooks<AppStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
