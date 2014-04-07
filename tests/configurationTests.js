var Configuration = require('../Configuration');
var should = require('should');
var status = require('../buildStatus');

describe('Configuration', function() {
    it('should return running if build is running', function () {
        var teamCityStatus =    { id: 13652,
            buildTypeId: 'bt2',
            number: '6029',
            status: 'SUCCESS',
            state: 'running',
            running: true,
            percentageComplete: 2,
            branchName: 'refs/heads/Development',
            defaultBranch: true,
            href: '/app/rest/builds/id:13652',
            webUrl: 'http://173.1.25.130:81/viewLog.html?buildId=13652&buildTypeId=bt2',
            statusText: 'Updating sources',
            buildType:
            { id: 'bt2',
                name: 'Autobahn Full (development, master and release branches)',
                description: 'Runs all tests and prepares deployment packages',
                projectName: 'Autobahn',
                projectId: 'Autobahn',
                href: '/app/rest/buildTypes/id:bt2',
                webUrl: 'http://173.1.25.130:81/viewType.html?buildTypeId=bt2' },
            tags: { tag: [] },
            'running-info':
            { percentageComplete: 2,
                elapsedSeconds: 13,
                estimatedTotalSeconds: 751,
                currentStageText: 'Updating sources: Transferring cached clean patch for VCS root: Ronaele (Release Branches)',
                outdated: false,
                probablyHanging: false },
            queuedDate: '20140406T170106-0500',
            startDate: '20140406T170107-0500',
            triggered:
            { type: 'user',
                date: '20140406T170106-0500',
                user:
                { username: 'tcabanski',
                    name: 'Tom Cabanski',
                    id: 2,
                    href: '/app/rest/users/id:2' } },
            lastChanges: { count: 1, change: [ [Object] ] },
            changes: { href: '/app/rest/changes?locator=build:(id:13652)' },
            revisions: { revision: [ [Object] ] },
            agent:
            { id: 4,
                name: 'dev-ba-2',
                typeId: 4,
                href: '/app/rest/agents/id:4' },
            artifacts: { href: '/app/rest/builds/id:13652/artifacts/children' },
            relatedIssues: { href: '/app/rest/builds/id:13652/relatedIssues' },
            properties:
            { count: 7,
                property:
                    [ [Object],
                        [Object],
                        [Object],
                        [Object],
                        [Object],
                        [Object],
                        [Object] ] },
            attributes: { count: 1, entry: [ [Object] ] },
            statistics: { href: '/app/rest/builds/id:13652/statistics' } };


        var configuration = new Configuration();
        configuration.checkStatus(teamCityStatus).should.equal(status.status.BUILDING);
    });

    it('should return running if build is running', function () {
        var teamCityStatus =    { id: 13701,
            buildTypeId: 'bt2',
            number: '6041',
            status: 'SUCCESS',
            state: 'finished',
            branchName: 'refs/heads/Development',
            defaultBranch: true,
            href: '/app/rest/builds/id:13701',
            webUrl: 'http://173.1.25.130:81/viewLog.html?buildId=13701&buildTypeId=bt2',
            statusText: 'Tests passed: 3047, ignored: 22',
            buildType:
            { id: 'bt2',
                name: 'Autobahn Full (development, master and release branches)',
                description: 'Runs all tests and prepares deployment packages',
                projectName: 'Autobahn',
                projectId: 'Autobahn',
                href: '/app/rest/buildTypes/id:bt2',
                webUrl: 'http://173.1.25.130:81/viewType.html?buildTypeId=bt2' },
            tags: { tag: [] },
            queuedDate: '20140407T104816-0500',
            startDate: '20140407T105836-0500',
            finishDate: '20140407T111103-0500',
            triggered:
            { type: 'vcs',
                details: 'jetbrains.git',
                date: '20140407T104816-0500' },
            lastChanges: { count: 1, change: [ [Object] ] },
            changes: { count: 1, href: '/app/rest/changes?locator=build:(id:13701)' },
            revisions: { revision: [ [Object] ] },
            agent:
            { id: 4,
                name: 'dev-ba-2',
                typeId: 4,
                href: '/app/rest/agents/id:4' },
            testOccurrences:
            { count: 3069,
                href: '/app/rest/testOccurrences?locator=build:(id:13701)',
                passed: 3047,
                ignored: 22,
                default: false },
            artifacts: { href: '/app/rest/builds/id:13701/artifacts/children' },
            relatedIssues: { href: '/app/rest/builds/id:13701/relatedIssues' },
            properties:
            { count: 7,
                property:
                    [ [Object],
                        [Object],
                        [Object],
                        [Object],
                        [Object],
                        [Object],
                        [Object] ] },
            attributes: { count: 1, entry: [ [Object] ] },
            statistics: { href: '/app/rest/builds/id:13701/statistics' } };


        var configuration = new Configuration();
        configuration.checkStatus(teamCityStatus).should.equal(status.status.BUILDING);
    });
});