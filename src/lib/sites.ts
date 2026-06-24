import type { SchoolSlug } from '@/domain/schoolSlug';

interface Site { slug: SchoolSlug; domains: (string | RegExp)[]; path: string }

const sites: Site[] = [
  { slug: 'design', domains: [ 'enroll.qcdesignschool.com', 'design.enrolltest.qccareerschool.com', 'design.nextenroll.qccareerschool.com', /^design.localhost(?::\d+)$/iu ], path: '/design' },
  { slug: 'event', domains: [ 'enroll.qceventplanning.com', 'event.enrolltest.qccareerschool.com', 'event.nextenroll.qccareerschool.com', /^event.localhost(?::\d+)$/iu ], path: '/event' },
  { slug: 'makeup', domains: [ 'enroll.qcmakeupacademy.com', 'makeup.enrolltest.qccareerschool.com', 'makeup.nextenroll.qccareerschool.com', /^makeup.localhost(?::\d+)$/iu ], path: '/makeup' },
  { slug: 'pet', domains: [ 'enroll.qcpetstudies.com', 'pet.enrolltest.qccareerschool.com', 'pet.nextenroll.qccareerschool.com', /^pet.localhost(?::\d+)$/iu ], path: '/pet' },
  { slug: 'wellness', domains: [ 'enroll.qcwellnessstudies.com', 'wellness.enrolltest.qccareerschool.com', 'wellness.nextenroll.qccareerschool.com', /^wellness.localhost(?::\d+)$/iu ], path: '/wellness' },
  { slug: 'writing', domains: [ 'enroll.winghill.com', 'writing.enrolltest.qccareerschool.com', 'writing.nextenroll.qccareerschool.com', /^writing.localhost(?::\d+)$/iu ], path: '/writing' },
  { slug: 'ppa', domains: [ 'enroll.pawparentacademy.com', 'ppa.enrolltest.qccareerschool.com', 'ppa.nextenroll.qccareerschool.com', /^ppa.localhost(?::\d+)$/iu ], path: '/ppa' },
];

export const findSite = (hostname: string | null): Site | undefined => {
  if (!hostname) {
    return;
  }
  return sites.find(s => s.domains.some(d => {
    if (typeof d === 'string') {
      return d === hostname;
    }
    return d.test(hostname);
  }));
};
