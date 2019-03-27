import Paper from 'src'

interface ICommandProps {
    paper: Paper
}

export default abstract class BaseCommand {
    paper: Paper

    constructor(props: ICommandProps) {
        this.paper = props.paper
    }

    abstract run(): void
}
