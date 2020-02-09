export function handleInputChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;

    this.setState({
        form: {
            ...this.state.form,
            [name]: value
        }
    });
}