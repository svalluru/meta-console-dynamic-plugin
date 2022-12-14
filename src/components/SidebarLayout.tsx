import * as React from 'react';
import {
  ActionGroup,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  FormGroup,
  PageSidebar,
} from "@patternfly/react-core";
import { ClusterDropdown } from "./ClusterDropdown";
import { ConsoleDropdown } from "./ConsoleDropdown";
import { ProjectDropdown } from "./ProjectDropdown";

export function SidebarLayout() {
  const sidebar = (
    <Card isFullHeight isPlain>
      <CardTitle>Header</CardTitle>
      <CardBody>
        <Form>
          <FormGroup label="Cluster" fieldId="cluster-01">
            <ClusterDropdown
              ariaLabel="Cluster env"
              id="cluster-01"
              name="cluster-01"
            />
          </FormGroup>
          <FormGroup label="Project" fieldId="project-01">
            <ProjectDropdown
              ariaLabel="Project name"
              id="project-01"
              name="project-01"
            />
          </FormGroup>
          <FormGroup label="Console" fieldId="console-01">
            <ConsoleDropdown
              ariaLabel="Console name"
              id="console-01"
              name="console-01"
            />
          </FormGroup>
          <ActionGroup>
            <Button variant="primary">Submit</Button>
          </ActionGroup>
        </Form>
      </CardBody>
      <CardFooter>footer</CardFooter>
    </Card>
  );

  return <PageSidebar theme="light" nav={sidebar} />;
}
