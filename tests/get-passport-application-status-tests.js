const { Selector } = require('testcafe');

fixture ('UK Passport Application Website').page('https://www.passport.service.gov.uk/help/enable-cookies');

const Reference = '<PEX Reference number>';
const EmailAddress = '<email address>';
const DayOfBirth = '<day of birth (2 digit)>'
const MonthOfBirth = '<month off birth (2 digit)>'
const YearOfBirth = '<year of birth (4 digit)>'

test('Get passport application renewal status', async (t) => {
    await t.click('#cookie-banner-accept')
    .click('#enabled-cookies-try-again')
    .navigateTo('https://www.passport.service.gov.uk/track/reference')
    .typeText('#reference', Reference)
    .click(Selector('button').withText('Continue'))
    .typeText('#applicant-email',EmailAddress)
    .typeText('#date-of-birth-day', DayOfBirth)
    .typeText('#date-of-birth-month', MonthOfBirth)
    .typeText('#date-of-birth-year', YearOfBirth)
    .click(Selector('button').withText('Continue'))
    .takeScreenshot()
    .expect(Selector('#header').innerText).eql('Your passport is on its way')
    .click(Selector('a').withText('Sign out'))
    .expect(Selector('#header').innerText).eql('Sign in');
    }
);
