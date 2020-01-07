import onboarding from '@onboarding-reducers/onboardingReducer';
import recovery from '@onboarding-reducers/recoveryReducer';
import newsletter from '@onboarding-reducers/newsletterReducer';
import { RecoveryActionTypes } from '@onboarding-types/recovery';
import { NewsletterActionTypes } from '@onboarding-types/newsletter';

import { Action } from '@suite-types';

interface OnboardingAppState extends ReturnType<typeof onboarding> {
    recovery?: ReturnType<typeof recovery>;
    newsletter?: ReturnType<typeof newsletter>;
}

export default function onboardingApp(state: OnboardingAppState | undefined, action: Action) {
    const onboardingState: OnboardingAppState = onboarding(state, action);
    return {
        reducerEnabled: onboardingState.reducerEnabled,
        prevDevice: onboardingState.prevDevice,
        activeStepId: onboardingState.activeStepId,
        activeSubStep: onboardingState.activeSubStep,
        selectedModel: onboardingState.selectedModel,
        deviceCall: onboardingState.deviceCall,
        uiInteraction: onboardingState.uiInteraction,
        path: onboardingState.path,
        backupType: onboardingState.backupType,
        recovery: recovery(onboardingState.recovery, action as RecoveryActionTypes),
        newsletter: newsletter(onboardingState.newsletter, action as NewsletterActionTypes),
    };
}
