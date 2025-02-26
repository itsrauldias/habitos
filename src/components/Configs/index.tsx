import { Card } from "flowbite-react";
import ListHabitos from "./components/ListHabitos";
import SystemConfigs from "./components/SystemConfigs";
import SystemData from "./components/SystemData";

export default function Configs() {

    return (<>
        <Card className="mb-2">
            <SystemConfigs />
        </Card>
        <Card className="mb-2">
            <ListHabitos />
        </Card>
        <Card className="mb-2">
            <SystemData />
        </Card>
    </>)
}
