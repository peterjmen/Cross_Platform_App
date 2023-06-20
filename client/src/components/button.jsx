export function Button(props) {
    const base = Button.variants[props.variant];
    return <button className={base} {...props} />;
}

Button.variants = {
    primary: 'bg-blue-500 text-white rounded-full px-10 py-2 transition-colors duration-200 hover:bg-blue-500/90',
    secondary: 'bg-white text-blue-500 rounded-full px-10 py-2 transition-colors duration-200 hover:bg-white/90'
};
