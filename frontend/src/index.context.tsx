import React from 'react';

const AppContext = React.createContext<{
}>(null as any);

export const AppContextProvider = ({ children, ...props }: any) => {

    return (
        <AppContext.Provider
            value={{
               
            }}
        >
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => React.useContext(AppContext);

export const withAppContext = (Component: any) => (props: any) => {
    return <Component {...props} loginForm={useAppContext()} />;
};
