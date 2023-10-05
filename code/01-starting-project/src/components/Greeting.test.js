import {render,screen} from '@testing-library/react';
import Greeting from './Greetings';

test("renders Greeting",()=>{
    render(<Greeting/>);
    const element = screen.getByText("Hello world", {exact:false});
    expect(element).toBeInTheDocument();
});