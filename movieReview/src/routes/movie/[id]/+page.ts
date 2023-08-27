export const load = ({params}: {
    params: {
        id: number;
    };
}) => {
    return {
        id: params.id
    };
};
