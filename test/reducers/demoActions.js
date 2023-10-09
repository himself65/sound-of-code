
export function demoAction(data) {
    return {
        type: 'DEMO_ACTION',
        payload: data
    };
}

export function anotherDemoAction() {
    return {
        type: 'ANOTHER_DEMO_ACTION'
    };
}