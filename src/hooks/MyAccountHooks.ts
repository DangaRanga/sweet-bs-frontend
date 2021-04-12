import { JWT } from './../models/AppData';
import { Reducer, useEffect, useReducer } from 'react';
import { Customer } from '../models';
import { toJSON } from '../utils/JsonUtils';

type ProfileUpdateAction =
    | { firstname: string }
    | { lastname: string }
    | { password: string }
    | { address: string }
    | { email: string };

function profileReducer(
    prevState: Partial<Customer>,
    action: ProfileUpdateAction
) {
    return { ...prevState, ...action };
}

type ProfileUpdater = React.Dispatch<ProfileUpdateAction>;

export function getUserInDb(updater: ProfileUpdater, jwt: JWT) {
    fetch('http://localhost:9090/user/info', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': jwt.token ?? '',
        },
    })
        .then((res) => res.json())
        .then((data) => {
            updater(data);
        });
}

export function updateUserInDb(data:ProfileUpdateAction, jwt:JWT) {
    fetch('http://localhost:9090/user/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Access-Token': jwt.token ?? '',
        },
        body: toJSON(data)
    })
}


export function useProfile(jwt: JWT) {
    const [profile, updateProfile] = useReducer<
        Reducer<Partial<Customer>, ProfileUpdateAction>
    >(profileReducer, {});

    useEffect(() => {
        let isMounted = true;

        if (isMounted) {
            getUserInDb(updateProfile, jwt);
        }
        return () => {
            isMounted = false;
        };
    }, [jwt]);

    return <const>[profile, updateProfile];
}

interface ToggleEditState {
    firstnameReadOnly: boolean;
    lastnameReadOnly: boolean;
    passwordReadOnly: boolean;
    addressReadOnly: boolean;
    emailReadOnly: boolean;
}

type ToggleEditAction =
    | { firstnameReadOnly: boolean }
    | {
          lastnameReadOnly: boolean;
      }
    | {
          passwordReadOnly: boolean;
      }
    | {
          addressReadOnly: boolean;
      }
    | {
          emailReadOnly: boolean;
      };

function toggleEditReducer(
    prevState: ToggleEditState,
    action: ToggleEditAction
) {
    return { ...prevState, ...action };
}

export function useToggleEdit() {
    const [toggleState, updateToggleState] = useReducer<
        Reducer<ToggleEditState, ToggleEditAction>
    >(toggleEditReducer, {
        firstnameReadOnly: true,
        lastnameReadOnly: true,
        passwordReadOnly: true,
        addressReadOnly: true,
        emailReadOnly: true,
    });

    return <const>[toggleState, updateToggleState];
}
