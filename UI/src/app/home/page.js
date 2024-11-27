'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Grid,
  Column,
} from '@carbon/react';
import {
  Advocate,
  Globe,
  AcceleratingTransformation,
} from '@carbon/pictograms-react';
import { InfoSection, InfoCard } from '@/components/Info/Info';
import Image from 'next/image';

export default function LandingPage() {

  

  return (
    <Grid className="landing-page" fullWidth>
      <Column lg={16} md={8} sm={4} className="landing-page__banner">
        <Breadcrumb noTrailingSlash aria-label="Page navigation">
          <BreadcrumbItem>
            <a href="/">Getting started</a>
          </BreadcrumbItem>
        </Breadcrumb>
        <h1 className="landing-page__heading">Cielospeso</h1>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r2">
        <Tabs defaultSelectedIndex={0}>
          <TabList className="tabs-group" aria-label="Page navigation">
            <Tab>About</Tab>
            <Tab>Key Features</Tab>
            <Tab>How It Works</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Grid className="tabs-group-content">
                <Column
                  md={4}
                  lg={7}
                  sm={4}
                  className="landing-page__tab-content"
                >
                  <h3 className="landing-page__subheading">
                    What is Cielospeso?
                  </h3>
                  <p className="landing-page__p">
                    Our web application simplifies and optimizes cloud budgeting
                    for clients. With the Aruba Cloud catalog, it features a
                    &quot;capacity calculator&quot; that helps users explore
                    resource combinations while staying within their budget. The
                    app provides accurate cost estimates and allows clients to
                    activate resources with just a click through API
                    integration. This solution makes budgeting smarter, more
                    intuitive, and fully automated, offering a seamless
                    experience that empowers clients to efficiently manage their
                    cloud resources. Our goal is to transform the way businesses
                    approach cloud budgeting with an intelligent, user-friendly
                    tool that adapts to their needs in the digital age.
                  </p>
                  <Button>Learn more</Button>
                </Column>
                <Column md={4} lg={{ span: 8, offset: 8 }} sm={4}>
                  <Image
                    className="landing-page__illo"
                    src="/tab-illo.png"
                    alt="Carbon illustration"
                    width={604}
                    height={498}
                  />
                </Column>
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid className="tabs-group-content">
                <Column
                  lg={16}
                  md={8}
                  sm={4}
                  className="landing-page__tab-content"
                >
                  <p className="landing-page__p">
                    <b>Intuitive Interface</b>: A user-friendly design that
                    makes budgeting and resource management easy for everyone,
                    regardless of technical expertise.
                    <br />
                    Accurate Cost Estimates: Get real-time cost projections
                    based on Aruba Cloud&apos;s resource catalog, ensuring
                    clients can make informed decisions without surprises.
                    <br />
                    API Integration: Effortlessly activate and manage resources
                    with a single click, streamlining the process and saving
                    time.
                    <br />
                    Smart Budgeting: The &quot;capacity calculator&quot;
                    dynamically adjusts resources and costs, helping users
                    optimize their cloud usage while staying within budget.
                    <br />
                    Automated Workflow: A fully automated system that minimizes
                    manual intervention, allowing businesses to focus on growth
                    while we handle the complexity.
                  </p>
                </Column>
              </Grid>
            </TabPanel>
            <TabPanel>
              <Grid className="tabs-group-content">
                <Column
                  lg={16}
                  md={8}
                  sm={4}
                  className="landing-page__tab-content"
                >
                  <p className="landing-page__p">
                    Explore Resources: Clients input their desired
                    specifications and budget. <br />
                    Calculate Costs: Our capacity calculator suggests the best
                    resource combinations from the Aruba Cloud catalog, tailored
                    to meet their needs.
                    <br />
                    Activate with One Click: Once the client is satisfied, they
                    can activate the resources through seamless API integration.
                    <br />
                  </p>
                </Column>
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Column>
      <Column lg={16} md={8} sm={4} className="landing-page__r3">
        <InfoSection heading="The Principles">
          <InfoCard
            heading="Carbon is Open"
            body="It's a distributed effort, guided by the principles of the open-source movement. Carbon's users are also it's makers, and everyone is encouraged to contribute."
            icon={() => <Advocate size={32} />}
          />
          <InfoCard
            heading="Carbon is Modular"
            body="Carbon's modularity ensures maximum flexibility in execution. It's components are designed to work seamlessly with each other, in whichever combination suits the needs of the user."
            icon={() => <AcceleratingTransformation size={32} />}
          />
          <InfoCard
            heading="Carbon is Consistent"
            body="Based on the comprehensive IBM Design Language, every element and component of Carbon was designed from the ground up to work elegantly together to ensure consistent, cohesive user experiences."
            icon={() => <Globe size={32} />}
          />
        </InfoSection>
      </Column>
    </Grid>
  );
}
