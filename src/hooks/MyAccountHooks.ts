import React, { Reducer, useReducer, useState } from 'react';
import { Customer } from '../models';


type ProfileUpdateAction =
    | { firstname: string }
    | { lastname: string }
    | { password: string }
    | { address: string }
    | { email: string };

function profileReducer(prevState:Partial<Customer>, action: ProfileUpdateAction) {
    return {...prevState, ...action};
}

export function useUpdateProfile() {
    const [profile, updateProfile] = useReducer<Reducer<Partial<Customer>, ProfileUpdateAction>>(profileReducer, {});
}
